/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Text,
  Avatar,
  Flex,
  ScrollArea,
  Card,
  IconButton,
  Button
  //
  // ThemePanel,
} from '@radix-ui/themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AuthContext } from './auth/auth';
import { useContext, useEffect } from 'react';
import { ExitIcon } from '@radix-ui/react-icons';

const PlaylistCard = ({ name, count, img }: any) => {
  return (
    <Card className="p-2 mb-[0.75rem]">
      <Flex align={'center'} justify={'between'} className="overflow-hidden">
        <Flex align={'center'} gap={'6'}>
          <Avatar color="ruby" fallback={name.charAt(0)} src={img} />
          <Text weight={'light'} size={'5'}>
            {name}
          </Text>
        </Flex>
        <Flex align={'center'} gap={'9'} justify={'between'}>
          <Text weight={'light'} color="gray" size={'5'}>
            {count} songs
          </Text>
          <IconButton color="green">
            <svg
              width="17"
              height="17"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3536 1.14645C12.1583 0.951184 11.8417 0.951184 11.6464 1.14645C11.4512 1.34171 11.4512 1.65829 11.6464 1.85355L12.7929 3H12C10.7037 3 9.71111 3.58423 8.87248 4.38931C8.20065 5.03427 7.59349 5.85684 6.99461 6.6682C6.86287 6.84668 6.73154 7.02462 6.6 7.2C5.10874 9.18835 3.49037 11 0.5 11C0.223858 11 0 11.2239 0 11.5C0 11.7761 0.223858 12 0.5 12C4.00963 12 5.89126 9.81165 7.4 7.8C7.54367 7.60845 7.6832 7.41962 7.81996 7.23454L7.82005 7.23443L7.82006 7.23441C8.41674 6.42695 8.96069 5.69085 9.56502 5.11069C10.2889 4.41577 11.0463 4 12 4H12.7929L11.6464 5.14645C11.4512 5.34171 11.4512 5.65829 11.6464 5.85355C11.8417 6.04882 12.1583 6.04882 12.3536 5.85355L14.3536 3.85355C14.5488 3.65829 14.5488 3.34171 14.3536 3.14645L12.3536 1.14645ZM0.5 3C3.35278 3 5.12992 4.44588 6.50548 6.06746L6.3762 6.24266C6.2483 6.4161 6.12293 6.58609 6 6.75C5.96397 6.79804 5.92798 6.84581 5.892 6.89331C4.57348 5.29306 3.02637 4 0.5 4C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3ZM8.87248 10.6107C8.37284 10.131 7.90897 9.55314 7.45767 8.95468C7.64688 8.71693 7.82704 8.48061 8 8.25L8.08987 8.12987C8.58412 8.79402 9.05288 9.39766 9.56502 9.88931C10.2889 10.5842 11.0463 11 12 11H12.7929L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.5488 11.3417 14.5488 11.6583 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12H12C10.7037 12 9.71111 11.4158 8.87248 10.6107Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  );
};

export default function HomeOS() {
  const { user, playlists, loginWithSpotifyClick, loading, logoutClick, shuffleTracks } = useContext<any>(AuthContext);
  console.log(user, playlists);
  
  useEffect(()=>{
    shuffleTracks("5svM86Q9KYWhePuGPyOafc")
  },[])
  // You need to make it display a screen for when the user is not logged in or null, and then add a login button so they can login, also logout. Then off there.
  return (
    <div
      className="w-[100vw] h-[100vh] overflow-hidden "
      style={{
        background: 'linear-gradient(150deg, transparent 60%, green 100%)'
      }}
    >
      <header className="w-[100vw] p-4 border-b border-gray-8 flex justify-between items-center sticky top-0 left-0 z-50 backdrop-blur-xl bg-white/30">
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
                    <button className='p-0'>
                      <Avatar fallback={user.display_name.charAt(0)} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[120px] mr-[0.35rem] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item  className="group text-[13px] leading-none truncate text-black rounded-[3px] flex items-center justify-between h-[25px] px-[8px] relative  select-none outline-none">
                        <Text>
                          {user?.display_name}
                        </Text>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-[1px] bg-[transparent] m-[2.5px] " />
                      <DropdownMenu.Item onClick={()=>logoutClick()}  className="group text-[13px] leading-none text-black rounded-[3px] flex items-center justify-between h-[25px] px-[8px] relative cursor-pointer select-none outline-none data-[disabled]:text-white data-[disabled]:pointer-events-none data-[highlighted]:bg-[#dc143c] data-[highlighted]:text-white">
                        Log-out{' '}
                        <ExitIcon/>
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
            className="p-[0.75rem] rounded-lg"
            radius="full"
            type="hover"
            scrollbars="vertical"
            style={{ height: 375 }}
          >
            {user &&
              playlists?.items
                .filter((item: any) => item.owner.id === user.id)
                .map((playlist: any) => (
                  <PlaylistCard
                    key={playlist.id}
                    name={playlist.name}
                    count={playlist.tracks.total}
                    img={playlist.images[0]?.url}
                  />
                ))}
          </ScrollArea>
        </Flex>
      )}
    </div>
  );
}
