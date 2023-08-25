import {
    Box,
    Button,
    Flex,
    Input,
    Select,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import Header from "../components/Header";
  import Sidebar from "../components/Sidebar";
  
  interface StockEntry {
    id: string;
    amount: string;
    product_id: string;
  }
  
  interface Product {
    id: string;
    name: string;
  }
  
  const StockEntries: React.FC = () => {
    const [amount, setAmount] = useState<string>("");
    const [product_id, setProduct_id] = useState<string>("0");
    const [listStockEntries, setStockEntries] = useState<StockEntry[]>([]);
    const [listProducts, setListProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      const db_stock_entries = localStorage.getItem("db_stock_entries")
        ? JSON.parse(localStorage.getItem("db_stock_entries") as string)
        : [];
  
      setStockEntries(db_stock_entries);
  
      const db_products = localStorage.getItem("db_products")
        ? JSON.parse(localStorage.getItem("db_products") as string)
        : [];
  
      setListProducts(db_products);
    }, []);
  
    const handleNewEntry = (): void => {
      if (!amount || product_id === "0") {
        return window.alert("Selecione o produto e a quantidade!");
      }
  
      const id = Math.random().toString(36).substring(2);
  
      const updatedEntries: StockEntry[] = [
        ...listStockEntries,
        { id, amount, product_id }
      ];
  
      localStorage.setItem("db_stock_entries", JSON.stringify(updatedEntries));
  
      setStockEntries(updatedEntries);
      setAmount("");
      setProduct_id("0");
    };
  
    const removeEntries = (id: string): void => {
      const newArray = listStockEntries.filter((item) => item.id !== id);
  
      localStorage.setItem("db_stock_entries", JSON.stringify(newArray));
  
      setStockEntries(newArray);
    };
  
    const getProductById = (id: string): string | undefined => {
      return listProducts.find((item) => item.id === id)?.name;
    };
  
    return (
      <Flex h="100vh" flexDirection="column">
        <Header />
  
        <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
          <Sidebar />
  
          <Box w="100%" ml="7">
            <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
              <Select
                value={product_id}
                onChange={(e) => setProduct_id(e.target.value)}
              >
                <option value="0">Selecione um item</option>
                {listProducts &&
                  listProducts.length > 0 &&
                  listProducts.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Select>
              <Input
                placeholder="Quantidade"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button w="40" onClick={handleNewEntry}>
                SALVAR
              </Button>
            </SimpleGrid>
  
            <Box overflowY="auto" height="80vh">
              <Table mt="6">
                <Thead>
                  <Tr>
                    <Th fontWeight="bold" fontSize="14px">
                      Nome
                    </Th>
                    <Th fontWeight="bold" fontSize="14px">
                      Qtd.
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listStockEntries.map((item, i) => (
                    <Tr key={i}>
                      <Td color="gray.500">{getProductById(item.product_id)}</Td>
                      <Td color="gray.500">{item.amount}</Td>
                      <Td textAlign="end">
                        <Button
                          p="2"
                          h="auto"
                          fontSize={11}
                          color="red.500"
                          fontWeight="bold"
                          onClick={() => removeEntries(item.id)}
                        >
                          DELETAR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  };
  
  export default StockEntries;