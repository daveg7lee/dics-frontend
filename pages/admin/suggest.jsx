import { Loading } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import SuggestItem from "../../components/admin/suggest/SuggetItem";
import AdminOnlyPage from "../../components/ProtectedPages/AdminOnlyPage";
import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const SUGGESTS = gql`
  query {
    findAllWaiting {
      success
      suggests {
        id
        title
        text
        type
        status
        user {
          username
          grade
        }
        reply {
          text
          user {
            username
            avatar
          }
        }
      }
    }
    findAllDone {
      success
      suggests {
        id
        title
        text
        type
        status
        user {
          username
          grade
        }
        reply {
          text
          user {
            username
            avatar
          }
        }
      }
    }
    findAllProcessing {
      success
      suggests {
        id
        title
        text
        type
        status
        user {
          username
          grade
        }
        reply {
          text
          user {
            username
            avatar
          }
        }
      }
    }
    findAllDecline {
      success
      suggests {
        id
        title
        text
        type
        status
        user {
          username
          grade
        }
        reply {
          text
          user {
            username
            avatar
          }
        }
      }
    }
  }
`;

const SuggestAdmin = () => {
  const { data, loading } = useQuery(SUGGESTS);

  return (
    <AdminOnlyPage>
      <Box w="full" py={28} px={{ lg: 32, md: 24, sm: 8 }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Heading fontSize="3xl" mb={4}>
              소리함 관리
            </Heading>
            <Tabs>
              <TabList>
                <Tab>대기 중인 건의사항</Tab>
                <Tab>진행 중인 건의사항</Tab>
                <Tab>완료된 건의사항</Tab>
                <Tab>거절된 건의사항</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    {data?.findAllWaiting?.suggests.map((suggest) => (
                      <SuggestItem
                        key={suggest.id}
                        suggest={suggest}
                        leftButtonType={{ status: "processing", text: "진행" }}
                        rightButtonType={{ status: "decline", text: "거절" }}
                      />
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box>
                    {data?.findAllProcessing?.suggests.map((suggest) => (
                      <SuggestItem
                        key={suggest.id}
                        suggest={suggest}
                        leftButtonType={{ status: "done", text: "완료" }}
                        rightButtonType={{ status: "waiting", text: "보류" }}
                      />
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box>
                    {data?.findAllDone?.suggests.map((suggest) => (
                      <SuggestItem
                        key={suggest.id}
                        suggest={suggest}
                        leftButtonType={{
                          status: "processing",
                          text: "재진행",
                        }}
                        rightButtonType={{ status: "decline", text: "거절" }}
                      />
                    ))}
                  </Box>
                </TabPanel>

                <TabPanel>
                  <Box>
                    {data?.findAllDecline?.suggests.map((suggest) => (
                      <SuggestItem
                        key={suggest.id}
                        suggest={suggest}
                        leftButtonType={{ status: "waiting", text: "재확인" }}
                        rightButtonType={{ status: "processing", text: "진행" }}
                      />
                    ))}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
    </AdminOnlyPage>
  );
};

export default SuggestAdmin;
