import { Box, Text, Spinner, Flex, Grid, GridItem } from '@chakra-ui/react'
import HeadBar from './HeadBar'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FlatType } from '@/types'
import FlatItem from './FlatItem'
import Pagination from './Pagination'

function Feed() {
    const [page, setPage] = useState(1)

    const getFlats = (page = 1) => fetch('/api/flats?pageNum=' + page).then((res) => res.json())

    const { isLoading, isError, data } = useQuery({
        queryKey: ['flats', page],
        queryFn: () => getFlats(page),
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    return (
        <Box>
            <HeadBar />
            <Box padding="100px 20px 50px 20px">
                {isError && (
                    <Text color="red">
                        Something is wrong. Please contact creator of this task.
                    </Text>
                )}
                {isLoading && (
                    <Flex height="200px" justifyContent="center" bg="#ffffff">
                        <Spinner width="100px" height="100px" size="xl" color="red" />
                    </Flex>
                )}
                {!isLoading && !isError && data && (
                    <>
                        <Grid
                            templateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                                'repeat(2, 1fr)',
                                'repeat(4, 1fr)',
                            ]}
                            rowGap={'30px'}
                            columnGap={'30px'}
                            marginBottom="50px"
                        >
                            {data.map((flat: FlatType) => (
                                <GridItem key={flat.id}>
                                    <FlatItem flat={flat} />
                                </GridItem>
                            ))}
                        </Grid>
                        <Pagination pageFunc={(page: number) => setPage(page)} page={page} />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default Feed
