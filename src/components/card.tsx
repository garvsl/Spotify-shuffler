/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { AuthContext } from "../auth/auth";
import React from "react";
import { Card, Flex, Avatar, Text } from "@radix-ui/themes";
import { ToastDemo } from "./toast";

export const PlaylistCard = ({ id, name, count, img }: any) => {
    const {
      shuffleTracks,
      setRefresh,
      createPlaylist,
      addTracksToPlaylist,
      user,
      setShuffleLoad
    } = useContext<any>(AuthContext);
    const [open, setOpen] = React.useState(false);
  
    async function handleShuffle() {
      setShuffleLoad(id);
      const tracks = await shuffleTracks(id);
      const playlist = await createPlaylist(name, user);
      await addTracksToPlaylist(playlist.id, tracks);
      setTimeout(() => {
        setRefresh((prev: any) => !prev);
        setShuffleLoad(null);
        setOpen(false);
      }, 500);
    }
  
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
            <ToastDemo func={() => handleShuffle()} open={open} setOpen={setOpen}>
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
            </ToastDemo>
          </Flex>
        </Flex>
      </Card>
    );
  };
  