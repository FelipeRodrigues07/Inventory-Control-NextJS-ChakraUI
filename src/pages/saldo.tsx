import React, { useEffect, useState } from "react";
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
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface StockOutput {
  product_id: string;
  amount: number;
}

interface StockEntry {
  product_id: string;
  amount: number;
}

interface Product {
  id: string;
  name: string;
}

const Balance: React.FC = () => {
  const [listProducts, setListProducts] = useState<StockOutput[]>([]);
  const [productFiltered, setProductFiltered] = useState<string>("");
  const [cmbProducts, setCmbProducts] = useState<Product[]>([]);

  const BuildBalanceArray = () => {
    const db_stock_outputs: StockOutput[] = JSON.parse(localStorage.getItem("db_stock_outputs") || "[]");
    const db_stock_entries: StockEntry[] = JSON.parse(localStorage.getItem("db_stock_entries") || "[]");
    const db_products: Product[] = JSON.parse(localStorage.getItem("db_products") || "[]");

    const newArray: StockOutput[] = [];

    db_products.forEach((prod) => {
      const entries = db_stock_entries
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const outputs = db_stock_outputs
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const total = Number(entries) - Number(outputs);

      newArray.push({
        product_id: prod.id,
        amount: total,
      });
    });

    setListProducts(newArray);
    setCmbProducts(db_products);
  };

  useEffect(() => {
    BuildBalanceArray();
  }, []);

  const getProductNameById = (id: string): string | undefined => {
    const product = cmbProducts.find((item) => item.id === id);
    return product ? product.name : "Produto não encontrado";
  };

  const handleFilterProducts = (): void => {
    if (!productFiltered) {
      setListProducts(cmbProducts.map((product) => ({ product_id: product.id, amount: 0 })));
      return;
    }

    const newArray = cmbProducts
      .filter((item) => item.id === productFiltered)
      .map((product) => ({ product_id: product.id, amount: 0 }));

    setListProducts(newArray);
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%" ml="6">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={productFiltered}
              onChange={(e) => setProductFiltered(e.target.value)}
            >
              <option value="">Selecione um item</option>
              {cmbProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Button w="40" onClick={handleFilterProducts}>
              FILTRAR
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
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{getProductNameById(item.product_id)}</Td>
                    <Td color="gray.500">{item.amount}</Td>
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

export default Balance;