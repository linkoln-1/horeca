'use client'

import { Flex, Button, Paper, Text, Grid } from '@mantine/core'
import Link from 'next/link'

export function Warning() {
    return (
        <Grid>
            <Grid.Col span={12}>
                <Paper bg='gray.1' p='md' radius='lg' withBorder shadow='xl'>
                    <Flex gap='md' align='center' direction='column'>
                        <Text size='xl' fw={700}>
                            Вы ещё не направляли предложения!
                        </Text>

                        <Text size='lg'>
                            Вы можете откликаться на любые заявки! Ваши клиенты
                            уже ждут Вас!
                        </Text>

                        <Button
                            variant='filled'
                            color='indigo'
                            component={Link}
                            href='/user/supplier/history'
                            size='lg'
                            fullWidth
                        >
                            Перейти к заявкам
                        </Button>
                    </Flex>
                </Paper>
            </Grid.Col>
        </Grid>
    )
}
