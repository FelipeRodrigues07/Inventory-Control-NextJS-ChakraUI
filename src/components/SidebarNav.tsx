import React from 'react'
import { Link as ChakraLink, Flex, Stack, Text} from "@chakra-ui/react";
import { useRouter } from 'next/router';



function SidebarNav()  {

    const router = useRouter();

    const { asPath } = useRouter();
   
  return (
 <Stack spacing="6"> 
    <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400" >
            CADASTRO
        </Text>
        <Stack>
            <ChakraLink
            onClick={() => {
                router.push("/")
            }}
            _hover={{ bg:"gray.100"}}  // underline é para efeito
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === "/" ? "gray.200" : ""}
            >
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                        PRODUTOS
                    </Text>
            </ChakraLink>
        </Stack>
    </Stack>
    <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
            ESTOQUE
        </Text>
        <Stack>
        <ChakraLink
            onClick={() => {
                router.push("/saldo")
            }}
            _hover={{ bg:"gray.100"}}  // underline é para efeito
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === "/saldo" ? "gray.200" : ""}
            >
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                        SALDO
                    </Text>
            </ChakraLink>
            <ChakraLink
             onClick={() => {
                router.push("/entradas")
            }}
            _hover={{ bg:"gray.100"}}  // underline é para efeito
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === "/entradas" ? "gray.200" : ""}
            > 
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                        ENTRADAS
                    </Text>
            </ChakraLink>
            <ChakraLink
             onClick={() => {
                router.push("/saidas")
            }}
            _hover={{ bg:"gray.100"}}  // underline é para efeito
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === "/saidas" ? "gray.200" : ""}
            >
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                        SAIDAS
                    </Text>
            </ChakraLink>
        </Stack>
    </Stack>
 </Stack>
  );
};

export default SidebarNav