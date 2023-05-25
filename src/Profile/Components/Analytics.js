import { ViewIcon } from '@chakra-ui/icons'
import { Box, Container, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Analytics() {
    const [data, setData] = useState([])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));

        fetch(`${process.env.REACT_API_URL}/api/analytics`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                if (res.status === 200) {
                    setData(res.url);
                }
            })
            .catch(error => {
                console.log(error, 'error')
            });
    }, [])

    return (
        <Container py={{ base: 20, md: 20 }} maxW={'5xl'}>
            <Box mb='4'>
                <Text>
                    See all links analytics
                </Text>
            </Box>

            <TableContainer border="1px" borderColor='green.100' rounded="xl">
                <Table variant='striped' colorScheme='green'>
                    <Thead>
                        <Tr>
                            <Th>S/N</Th>
                            <Th>Initial Url</Th>
                            <Th>Shortened Url</Th>
                            <Th>Clicks</Th>
                            <Th>Date Created</Th>
                            <Th >Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((item, i) => {
                                return (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>
                                            <Text className='text-container' w="250px" noOfLines={1}>
                                                {item.origUrl}</Text>
                                        </Td>
                                        <Td>{item.shortUrl}</Td>
                                        <Td >{item.clicks}</Td>
                                        <Td>{new Date(item.date).toLocaleDateString()}</Td>
                                        <Td>
                                            <Link to={`/visit/${item._id}`}>
                                                <Tooltip label="View analytics" aria-label='A tooltip'>
                                                    <ViewIcon _hover={{ cursor: 'pointer', }} />
                                                </Tooltip>
                                            </Link>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Analytics