import React from "react";
import { logUserOut } from "../apollo";
import Link from "next/link";
import useUser from "../hooks/useUser";
import {
  Avatar,
  Box,
  Divider,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data } = useUser();

  return (
    <Box
      as="header"
      w="100vw"
      borderBottom="1px"
      borderColor="gray.200"
      position="fixed"
      top={0}
      zIndex={99}
      px={{ lg: 32, md: 24, sm: 8 }}
      display="flex"
      justifyContent="space-between"
      py={4}
    >
      <Box display="flex" alignItems="center">
        <Link href={data?.me ? "/home" : "/"}>
          <Heading fontSize="2xl">DICS Students</Heading>
        </Link>
        {data?.me && data?.me?.type !== "Admin" && (
          <Link href="/suggest">
            <Text color="gray" fontSize="sm" ml={5}>
              소리함
            </Text>
          </Link>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        {data?.me && (
          <Menu>
            <MenuButton>
              <Avatar src={data?.me?.avatar} size="sm" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <Link href="edit">
                <MenuItem>
                  <Text color="gray" fontSize="sm">
                    Edit Profile
                  </Text>
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem onClick={() => logUserOut()}>
                <Text color="gray" fontSize="sm">
                  Log Out
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <IconButton
          onClick={toggleColorMode}
          aria-label="dark-mode"
          ml={2}
          size="sm"
          variant="ghost"
          icon={
            colorMode === "light" ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )
          }
        ></IconButton>
      </Box>
    </Box>
  );
};

export default Header;
