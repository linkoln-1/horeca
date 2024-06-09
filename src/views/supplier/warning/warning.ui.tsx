"use client"

import { Flex, Button, Paper, Text } from "@mantine/core";
import Link from "next/link";

export function Warning() {
  return (
    <Flex 
    direction="column" 
    align="center" 
    justify="center" 
    style={{minHeight: "64vh", padding: "0 20px"}}>
        <Paper 
        bg="gray.1" 
        p="md"
        radius="lg" 
        withBorder 
        shadow="xl" 
        style={{textAlign: "center", width: 700, height: 200,}}
        >
          <Flex gap='lg' align='center' direction='column'>
              <Text size="xl" style={{fontWeight: 700}}>Вы ещё не направляли предложения!</Text>
              <Text size="lg">Вы можете откликаться на любые заявки! Ваши клиенты уже ждут Вас!</Text>
              <Button 
              variant="filled" 
              mt="md" 
              style={{ padding: '10px 20px', fontSize: '18px', width: 400, height: 50 }}
              radius="xl"
              color="indigo"
              component={Link}
              href="/user/supplier/history"
              >
                Перейти к заявкам
              </Button>
          </Flex>
        </Paper>
    </Flex>    
  );
}
