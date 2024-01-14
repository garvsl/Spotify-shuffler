/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Avatar, Flex, ScrollArea, Card, IconButton, Button } from '@radix-ui/themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AuthContext } from './auth/auth';
import { useContext } from 'react';
import { ExitIcon } from '@radix-ui/react-icons';

import * as React from 'react';
import { ToastDemo } from './components/toast';
import { PlaylistCard } from './components/card';


export default function HomeOS() {
  const { user, playlists, loginWithSpotifyClick, loading, logoutClick } =
    useContext<any>(AuthContext);

  return (
    <div
      className="w-[100vw] h-[100vh] rounded-t-lg overflow-hidden  "
      style={{
        background: 'linear-gradient(150deg, transparent 40%, green 110%)'
      }}
    >
      <header className="w-[100vw] p-4 border-b border-gray-8 flex justify-between items-center sticky top-0 left-0 z-50 backdrop-blur-3xl bg-white/30">
        {!loading && (
          <>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <svg width="20" height="20" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82708 7.49972C1.82708 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82708 10.6327 1.82708 7.49972ZM5.03747 9.21395C4.87949 8.98746 4.56782 8.93193 4.34133 9.08991C4.11484 9.24789 4.05931 9.55956 4.21729 9.78605C4.93926 10.8211 6.14033 11.5 7.50004 11.5C8.85974 11.5 10.0608 10.8211 10.7828 9.78605C10.9408 9.55956 10.8852 9.24789 10.6587 9.08991C10.4323 8.93193 10.1206 8.98746 9.9626 9.21395C9.41963 9.99238 8.51907 10.5 7.50004 10.5C6.481 10.5 5.58044 9.99238 5.03747 9.21395ZM5.37503 6.84998C5.85828 6.84998 6.25003 6.45815 6.25003 5.97498C6.25003 5.4918 5.85828 5.09998 5.37503 5.09998C4.89179 5.09998 4.50003 5.4918 4.50003 5.97498C4.50003 6.45815 4.89179 6.84998 5.37503 6.84998ZM10.5 5.97498C10.5 6.45815 10.1083 6.84998 9.62503 6.84998C9.14179 6.84998 8.75003 6.45815 8.75003 5.97498C8.75003 5.4918 9.14179 5.09998 9.62503 5.09998C10.1083 5.09998 10.5 5.4918 10.5 5.97498Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
              {user ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="p-0">
                      <Avatar fallback={user?.display_name?.charAt(0)} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[120px] mr-[0.35rem] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item className="group text-[13px] leading-none truncate text-black rounded-[3px] flex items-center justify-between h-[25px] px-[8px] relative  select-none outline-none">
                        <Text>{user?.display_name}</Text>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-[1px] bg-[transparent] m-[2.5px] " />
                      <DropdownMenu.Item
                        onClick={() => logoutClick()}
                        className="group text-[13px] leading-none text-black rounded-[3px] flex items-center justify-between h-[25px] px-[8px] relative cursor-pointer select-none outline-none data-[disabled]:text-white data-[disabled]:pointer-events-none data-[highlighted]:bg-[#dc143c] data-[highlighted]:text-white"
                      >
                        Log-out <ExitIcon />
                      </DropdownMenu.Item>
                      <DropdownMenu.Arrow className="fill-white mr-[0.35rem]" />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <Button onClick={() => loginWithSpotifyClick()}>Login</Button>
              )}
            </div>
          </>
        )}
      </header>

      {!loading && (
        <Flex mt={'9'} ml={'8'} mr={'8'} direction="column" gap={'8'}>
          <Text ml={'3'} mr={'3'} highContrast color="gray" size={'9'} className="">
            Spotify Shuffler
          </Text>
          <Text ml={'4'} mr={'3'} mt={'-7'} color="gray" size={'2'} className="">
            {user
              ? 'Click the green button on any playlist youd like to shuffle'
              : 'Login to Spotify to shuffle your playlists'}
          </Text>
          <ScrollArea
            size={'1'}
            className="p-[0.75rem] rounded-xl  bg-white/50  border-black border-2 border-opacity-5"
            radius="full"
            type="hover"
            scrollbars="vertical"
            style={{ height: 375 }}
          >
            {user &&
              playlists?.items
                ?.filter((item: any) => item.owner.id === user.id)
                ?.map((playlist: any) => (
                  <PlaylistCard
                    key={playlist?.id}
                    id={playlist?.id}
                    name={playlist?.name}
                    count={playlist?.tracks?.total}
                    img={playlist?.images[0]?.url}
                  />
                ))}
          </ScrollArea>
        </Flex>
      )}
    </div>
  );
}
