/* eslint-disable no-unused-vars */
import {
  Excalidraw as Ex,
  exportToClipboard,
  Footer,
  LiveCollaborationTrigger,
  MainMenu,
  MIME_TYPES,
  sceneCoordsToViewportCoords,
  Sidebar,
  useHandleLibrary
} from '@excalidraw/excalidraw'
import { NonDeletedExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import {
  AppState,
  BinaryFileData,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
  PointerDownState as ExcalidrawPointerDownState,
  Gesture
} from '@excalidraw/excalidraw/types/types'
import { ResolvablePromise } from '@excalidraw/excalidraw/types/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flex } from 'styled-system/patterns'
import CustomFooter from './CustomFooter'
import initialData from './initialData'
import { resolvablePromise } from './utils'

declare global {
  interface Window {
    ExcalidrawLib: any
  }
}

type Comment = {
  x: number
  y: number
  value: string
  id?: string
}

type PointerDownState = {
  x: number
  y: number
  hitElement: Comment
  onMove: any
  onUp: any
  hitElementOffsets: {
    x: number
    y: number
  }
}
// This is so that we use the bundled excalidraw.development.js file instead
// of the actual source code

const COMMENT_ICON_DIMENSION = 32

export interface ExcalidrawProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Excalidraw({ size = 'sm' }: ExcalidrawProps) {
  const appRef = useRef<any>(null)
  const [viewModeEnabled, setViewModeEnabled] = useState(true)
  const [zenModeEnabled, setZenModeEnabled] = useState(false)
  const [gridModeEnabled, setGridModeEnabled] = useState(false)
  const [blobUrl, setBlobUrl] = useState<string>('')
  const [canvasUrl, setCanvasUrl] = useState<string>('')
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false)
  const [exportEmbedScene, setExportEmbedScene] = useState(false)
  const [theme, setTheme] = useState('light')
  const [isCollaborating, setIsCollaborating] = useState(false)
  const [commentIcons, setCommentIcons] = useState<{ [id: string]: Comment }>(
    {}
  )
  const [comment, setComment] = useState<Comment | null>(null)

  const initialStatePromiseRef = useRef<{
    promise: ResolvablePromise<ExcalidrawInitialDataState | null>
  }>({ promise: null! })
  if (!initialStatePromiseRef.current.promise) {
    initialStatePromiseRef.current.promise = resolvablePromise()
  }

  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null)

  useHandleLibrary({ excalidrawAPI })

  useEffect(() => {
    if (!excalidrawAPI) {
      return
    }
    const fetchData = async () => {
      const res = await fetch('/rocket.jpeg')
      const imageData = await res.blob()
      const reader = new FileReader()
      reader.readAsDataURL(imageData)

      reader.onload = function () {
        const imagesArray: BinaryFileData[] = [
          {
            id: 'rocket' as BinaryFileData['id'],
            dataURL: reader.result as BinaryFileData['dataURL'],
            mimeType: MIME_TYPES.jpg,
            created: 1644915140367,
            lastRetrieved: 1644915140367
          }
        ]

        //@ts-ignore
        initialStatePromiseRef.current.promise.resolve(initialData)
        excalidrawAPI.addFiles(imagesArray)
      }
    }
    fetchData()
  }, [excalidrawAPI])

  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const islands: any[] = appRef.current.querySelectorAll('.Island')
          islands.forEach(island => {
            island.style.display = viewModeEnabled ? 'none' : ''
          })
        }
      })
    })

    if (appRef.current) {
      observer.observe(appRef.current, { childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [viewModeEnabled])

  const renderTopRightUI = (isMobile: boolean) => {
    return (
      <>
        {!isMobile && (
          <LiveCollaborationTrigger
            isCollaborating={isCollaborating}
            onSelect={() => {
              window.alert('Collab dialog clicked')
            }}
          />
        )}
      </>
    )
  }

  const onLinkOpen = useCallback(
    (
      element: NonDeletedExcalidrawElement,
      event: CustomEvent<{
        nativeEvent: MouseEvent | React.PointerEvent<HTMLCanvasElement>
      }>
    ) => {
      const link = element.link!
      const { nativeEvent } = event.detail
      const isNewTab = nativeEvent.ctrlKey || nativeEvent.metaKey
      const isNewWindow = nativeEvent.shiftKey
      const isInternalLink =
        link.startsWith('/') || link.includes(window.location.origin)
      if (isInternalLink && !isNewTab && !isNewWindow) {
        // signal that we're handling the redirect ourselves
        event.preventDefault()
        // do a custom redirect, such as passing to react-router
        // ...
      }
    },
    []
  )

  const onCopy = async (type: 'png' | 'svg' | 'json') => {
    if (!excalidrawAPI) {
      return false
    }
    await exportToClipboard({
      elements: excalidrawAPI.getSceneElements(),
      appState: excalidrawAPI.getAppState(),
      files: excalidrawAPI.getFiles(),
      type
    })
    window.alert(`Copied to clipboard as ${type} successfully`)
  }

  const [pointerData, setPointerData] = useState<{
    pointer: { x: number; y: number }
    button: 'down' | 'up'
    pointersMap: Gesture['pointers']
  } | null>(null)

  const onPointerDown = (
    activeTool: AppState['activeTool'],
    pointerDownState: ExcalidrawPointerDownState
  ) => {
    if (activeTool.type === 'custom' && activeTool.customType === 'comment') {
      const { x, y } = pointerDownState.origin
      setComment({ x, y, value: '' })
    }
  }

  const rerenderCommentIcons = () => {
    if (!excalidrawAPI) {
      return false
    }
    const commentIconsElements = appRef.current.querySelectorAll(
      '.comment-icon'
    ) as HTMLElement[]
    commentIconsElements.forEach(ele => {
      const id = ele.id
      const appstate = excalidrawAPI.getAppState()
      const { x, y } = sceneCoordsToViewportCoords(
        { sceneX: commentIcons[id].x, sceneY: commentIcons[id].y },
        appstate
      )
      ele.style.left = `${
        x - COMMENT_ICON_DIMENSION / 2 - appstate!.offsetLeft
      }px`
      ele.style.top = `${
        y - COMMENT_ICON_DIMENSION / 2 - appstate!.offsetTop
      }px`
    })
  }

  const renderSidebar = () => {
    return (
      <Sidebar>
        <Sidebar.Header>Custom header!</Sidebar.Header>
        Custom sidebar!
      </Sidebar>
    )
  }

  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.Export />
        <MainMenu.Separator />
        <MainMenu.DefaultItems.LiveCollaborationTrigger
          isCollaborating={isCollaborating}
          onSelect={() => window.alert('You clicked on collab button')}
        />
        <MainMenu.Group title="Excalidraw links">
          <MainMenu.DefaultItems.Socials />
        </MainMenu.Group>
        <MainMenu.Separator />
        <MainMenu.DefaultItems.Help />
      </MainMenu>
    )
  }

  const heightPx = useMemo(() => {
    switch (size) {
      case 'sm': {
        return { height: '400px' }
      }
      case 'md': {
        return { height: '600px' }
      }
      case 'lg': {
        return { height: '800px' }
      }
    }
  }, [size])

  return (
    <div
      className={flex({
        width: '100%',
        height: '600px',
        smDown: {
          maxHeight: '200px'
        },
        smToMd: {
          maxHeight: '400px'
        },
        borderRadius: '.5rem',
        overflow: 'hidden'
      })}
      ref={appRef}
    >
      <Ex
        excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
        initialData={initialStatePromiseRef.current.promise}
        onPointerUpdate={(payload: {
          pointer: { x: number; y: number }
          button: 'down' | 'up'
          pointersMap: Gesture['pointers']
        }) => setPointerData(payload)}
        viewModeEnabled={viewModeEnabled}
        zenModeEnabled={zenModeEnabled}
        gridModeEnabled={gridModeEnabled}
        theme={theme}
        UIOptions={{
          canvasActions: { loadScene: false }
        }}
        renderTopRightUI={renderTopRightUI}
        onLinkOpen={onLinkOpen}
        onPointerDown={onPointerDown}
        onScrollChange={rerenderCommentIcons}
        renderSidebar={renderSidebar}
      >
        {excalidrawAPI && (
          <Footer>
            <CustomFooter excalidrawAPI={excalidrawAPI} />
          </Footer>
        )}
        {renderMenu()}
      </Ex>
    </div>
  )
}

export default Excalidraw
