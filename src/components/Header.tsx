import React from 'react'
import { Avatar, Flex, HStack, Icon, IconButton, Text, useBreakpointValue} from "@chakra-ui/react"
import { useSidebarContext } from "@/contexts/SidebarContext";
import { FiMenu} from "react-icons/fi"

                                      //flex uma div com display flex declarado
function Header() {

    //verificação se a tela é mobile ou não  useBreak é dentro do chakra
    const isMobile = useBreakpointValue({
        base: true,
        lg: false,
    });

    const { onOpen } = useSidebarContext();

  return (
    <Flex 
    as="header"
    w="100%"
    maxW={1120} //1120
    h="20" //multiplica por 4- 80px
    mx="auto"// margin horizontal
    px="2" //padding nas laterais
    py="2" //padding encima e baixo -8px
    align="center"
    boxShadow=" 0 1px 0 #ccc" //embaixo                  hstack ja deixa organizado spacing="0"
    color="gray.500"
    fontWeight="bold"
    >
     {isMobile && (
        <IconButton
        icon={<Icon as={FiMenu}/>}
        onClick={onOpen}
        variant="unstyled"
        fontSize={20}
        mr="2"
        aria-label="Abrir menu"
        ></IconButton>
     )}
        <Text>Logo</Text> 
        <Flex ml="auto" >    
            <HStack > 
                <Text >Felipe Rodrigues</Text>
                <Avatar size="md" name="Felipe Rodrigues"></Avatar>
            </HStack>
        </Flex>
    </Flex>
  );
}

export default Header 