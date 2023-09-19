import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mealsApi } from "../api";
import {
  Box,
  Container,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

export default function Meal() {
  const { data } = useQuery(["meals"], mealsApi.findAll);

  return (
    <Container pt="24" minH="100vh">
      {data &&
        data?.map((i) => (
          <>
            <Heading mb="4" mt="6" size="md">
              {i.meal_date}
            </Heading>

            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  아침 메뉴
                </Heading>
                <Text pt="2" fontSize="sm">
                  {i?.breakfast_menus?.map((menu, index) => {
                    return `${menu.name}${
                      index !== i?.breakfast_menus?.length - 1 ? ", " : " "
                    }`;
                  })}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  점심 메뉴
                </Heading>
                <Text pt="2" fontSize="sm">
                  {i?.lunch_menus?.map((menu, index) => {
                    return `${menu.name}${
                      index !== i?.lunch_menus?.length - 1 ? ", " : " "
                    }`;
                  })}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  저녁 메뉴
                </Heading>
                <Text pt="2" fontSize="sm">
                  {i?.dinner_menus?.map((menu, index) => {
                    return `${menu.name}${
                      index !== i?.dinner_menus?.length - 1 ? ", " : " "
                    }`;
                  })}
                </Text>
              </Box>
            </Stack>
          </>
        ))}
    </Container>
  );
}
