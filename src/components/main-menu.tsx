import { ScreenStates } from '@/app/(lobby)/page'
import { useShowMenuOptions } from '@/hooks/use-show-menu-options'
import { useShowPressAny } from '@/hooks/use-show-press-any'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'
import { AboutMe } from './about-me'
import { Projects } from './projects'
import { StarsBackground } from './stars-background'
import { ShellAnimated } from './ui/ShellAnimated'
import { MenuOption } from './ui/menu-option'
import { MenuOptions } from './ui/menu-options'

export type MenuStates = '' | 'press-any' | 'menu'

export type OptionStates = '' | 'continue' | 'new-game' | 'settings' | 'license'

interface MainMenuProps {
  setScreenState: Dispatch<SetStateAction<ScreenStates>>
}

const MainMenu = ({ setScreenState }: MainMenuProps) => {
  const [menuState, setMenuState] = useState<MenuStates>('press-any')
  const [optionState, setOptionState] = useState<OptionStates>('')

  const { exitPressAny } = useShowPressAny(menuState, setMenuState)
  const { exitMainMenu } = useShowMenuOptions(
    menuState,
    optionState,
    setScreenState,
  )

  return (
    <AnimatePresence>
      <ShellAnimated
        className={`relative z-40 flex h-full w-full flex-col bg-[#01040F] bg-[linear-gradient(180deg,_hsla(227,_88%,_3%,_1)_30%,_hsla(222,_67%,_10%,_1)_67%,_hsla(100,_7%,_24%,_1)_100%)] font-medium tracking-[0.15em]`}
      >
        <AnimatePresence>
          {menuState === 'press-any' && (
            <ShellAnimated exit={{ opacity: 0, transition: { duration: 2 } }}>
              <StarsBackground {...{ optionState }} />
            </ShellAnimated>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!(menuState === 'press-any') && (
            <ShellAnimated>
              <motion.video
                loop
                autoPlay
                className="pointer-events-none fixed left-0 top-0 h-[100vh] w-[100vw] object-cover opacity-20"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [
                    0, 0.05, 0.1, 0.15, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2,
                    0.2, 0,
                  ],
                  transition: { duration: 14.15, repeat: Infinity },
                }}
              >
                <source src="videos/stars-1.mp4" type="video/mp4" />
              </motion.video>
              <motion.video
                loop
                autoPlay
                className="pointer-events-none fixed left-0 top-0 h-[100vh] w-[100vw] scale-x-[-1] object-cover opacity-20"
                initial={{ opacity: 0 }}
                animate={{
                  // opacity: [0, 0.2, 0.2, 0.2, 0.2, 0.2, 0],
                  opacity: [0, 0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0, 0],
                  transition: { duration: 10, repeat: Infinity, delay: 10 },
                }}
              >
                <source src="videos/stars-2.mp4" type="video/mp4" />
              </motion.video>
            </ShellAnimated>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuState === 'press-any' && (
            <div className="h-full w-full" onClick={exitPressAny}>
              <ShellAnimated className="absolute bottom-48 left-1/2 -translate-x-1/2 sm:bottom-60">
                <MenuOptions className="flex flex-col gap-3">
                  <MenuOption textHidden={'Main Menu'} showLine>
                    Press Any Button
                  </MenuOption>
                </MenuOptions>
              </ShellAnimated>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuState === 'menu' && (
            <ShellAnimated className="absolute bottom-20 left-1/2 -translate-x-1/2 sm:bottom-40">
              <MenuOptions className="flex flex-col gap-3">
                <MenuOption
                  textHidden={'About Me'}
                  data-active="true"
                  onClick={() => setOptionState('continue')}
                >
                  About Me
                </MenuOption>
                <MenuOption
                  textHidden={'Projects'}
                  onClick={() => setOptionState('new-game')}
                >
                  Projects
                </MenuOption>
                <MenuOption textHidden={'Nothing'}>Settings</MenuOption>
                <MenuOption textHidden={'Nothing'}>License</MenuOption>
                <MenuOption textHidden={'Exit Game'} onClick={exitMainMenu}>
                  Exit Game
                </MenuOption>
              </MenuOptions>
            </ShellAnimated>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {optionState !== '' && (
            <ShellAnimated
              className="z-10 h-full w-full"
              animate={{ opacity: 1, transition: { delay: 0, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {optionState === 'continue' && (
                <AboutMe {...{ setMenuState, setOptionState }} />
              )}
              {optionState === 'new-game' && (
                // <Projects {...{ setMenuState, setOptionState }} />
                <Projects {...{ setMenuState, setOptionState }} />
              )}
            </ShellAnimated>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-50 bg-[rgba(255,0,0,0)] backdrop-blur-[0.8px]" />
      </ShellAnimated>
    </AnimatePresence>
  )
}

export { MainMenu }
