import React from "react";
import { logUserOut } from "../apollo";
import Link from "next/link";
import useUser from "../hooks/useUser";
import {
  Avatar,
  Tag,
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
  Link as StyledLink,
} from "@chakra-ui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

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
        {data?.me && data?.me?.type !== "Admin" ? (
          <Link href="/suggest">
            <Text color="gray" fontSize="sm" ml={5}>
              소리함{" "}
              <Tag
                colorScheme="red"
                borderRadius="full"
                size="sm"
                variant="subtle"
              >
                Beta
              </Tag>
            </Text>
          </Link>
        ) : (
          <StyledLink href={process.env.NEXT_PUBLIC_ADMIN_PAGE} isExternal>
            <Text color="gray" fontSize="sm" ml={5}>
              어드민{" "}
              <Tag
                colorScheme="red"
                borderRadius="full"
                size="sm"
                variant="subtle"
              >
                Alpha
              </Tag>
            </Text>
          </StyledLink>
        )}
        <Text color="gray" fontSize="sm" ml={5}>
          시간표{" "}
          <Tag
            colorScheme="purple"
            borderRadius="full"
            size="sm"
            variant="subtle"
          >
            Coming Soon
          </Tag>
        </Text>
        <Text color="gray" fontSize="sm" ml={5}>
          급식표{" "}
          <Tag
            colorScheme="purple"
            borderRadius="full"
            size="sm"
            variant="subtle"
          >
            Coming Soon
          </Tag>
        </Text>
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
          icon={colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
        ></IconButton>
      </Box>
    </Box>
  );
};

export default Header;
