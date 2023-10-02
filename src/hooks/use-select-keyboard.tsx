import { getRefAttribute, setRefAttribute } from '@/lib/utils'
import { RefObject, useEffect } from 'react'

export const useSelectKeyboard = (elementRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyboard(e, elementRef))
    return () =>
      document.removeEventListener('keydown', (e) =>
        handleKeyboard(e, elementRef),
      )
  }, [elementRef])
}

const handleActivateOption = (elementRef: RefObject<HTMLElement>) => {
  if (!elementRef.current) return null

  const currentElement = elementRef.current
  const elementDataIdValue = Number(
    getRefAttribute(currentElement, 'data-element-id', '0'),
  )

  for (let i = 0; i < currentElement.childElementCount; i++) {
    currentElement.children[i]?.setAttribute('data-active', 'false')
  }

  currentElement?.children[elementDataIdValue]?.setAttribute(
    'data-active',
    'true',
  )
}

const handleElementClickEvent = (elementRef: RefObject<HTMLElement>) => {
  if (!elementRef.current) return null

  const elementDataIdValue = getRefAttribute(
    elementRef.current,
    'data-elementType',
    'about-me',
  )

  if (elementDataIdValue === 'menu') {
    const menuDataIdValue = Number(
      getRefAttribute(elementRef.current, 'data-element-id', '0'),
    )

    const MenuOption = elementRef.current.children[
      menuDataIdValue
    ] as HTMLDivElement

    MenuOption.click()
  }

  if (elementDataIdValue === 'settings') {
    const settingDataIdValue = Number(
      getRefAttribute(elementRef.current, 'data-element-id', '0'),
    )

    const settingOption = elementRef.current.children[
      settingDataIdValue
    ] as HTMLDivElement

    settingOption.click()
  }
}

const handleArrowUp = (elementRef: RefObject<HTMLElement>) => {
  if (!elementRef.current) return null

  const currentElement = elementRef.current

  const elementChildrenLength = currentElement
    ? currentElement.childElementCount - 1
    : 0

  const elementDataIdValue =
    Number(getRefAttribute(currentElement, 'data-element-id', '0')) - 1

  // if less than 0 return Length
  const elementNewDataValue =
    elementDataIdValue < 0 ? elementChildrenLength : elementDataIdValue

  setRefAttribute(currentElement, 'data-element-id', elementNewDataValue)
}

const handleArrowDown = (elementRef: RefObject<HTMLElement>) => {
  if (!elementRef.current) return null

  const currentElement = elementRef.current

  const elementChildrenLength = currentElement
    ? currentElement.childElementCount - 1
    : 0

  const elementDataIdValue =
    Number(getRefAttribute(currentElement, 'data-element-id', '0')) + 1

  // if greater than length return 0
  const elementNewDataValue =
    elementDataIdValue > elementChildrenLength ? 0 : elementDataIdValue

  setRefAttribute(currentElement, 'data-element-id', elementNewDataValue)
}

const handleKeyboard = (
  e: KeyboardEvent,
  elementRef: RefObject<HTMLElement>,
) => {
  if (e.key === 'Enter' || e.key === 'e' || e.key === 'f') {
    handleElementClickEvent(elementRef)
  }

  if (e.key === 'ArrowUp') handleArrowUp(elementRef)
  if (e.key === 'ArrowDown') handleArrowDown(elementRef)

  handleActivateOption(elementRef)
}
