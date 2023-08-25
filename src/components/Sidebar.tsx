import{ Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue} from "@chakra-ui/react";
import React from "react";
import { useSidebarContext } from "@/contexts/SidebarContext";
import SidebarNav from "./SidebarNav";



function Sidebar() {
    const {isOpen , onClose } = useSidebarContext();

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    });

  if (isDrawerSidebar){
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={()=>onClose()}
  >
    <DrawerOverlay />
    <DrawerContent p="2" onClick={()=> onClose()}>
      <DrawerCloseButton />
      <DrawerHeader/>
      <DrawerBody>
        <SidebarNav/>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
  )
};
return (
    <Box>
        <SidebarNav/>
    </Box>
)
}

export default Sidebar

