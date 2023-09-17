import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Stack, Box } from '@chakra-ui/react'
import PageButton from './PageButton'

export interface PaginationProps {
    pageFunc: (page: number) => void
    page: number
}

function Pagination({ pageFunc, page }: PaginationProps) {
    const getActualNumbers = (page: number) => {
        const resultArray = []
        if (page > 2) {
            resultArray.push(page - 1)
        }
        if (page !== 1 && page !== 25) {
            resultArray.push(page)
        }
        if (page < 24) {
            resultArray.push(page + 1)
        }
        return resultArray
    }

    return (
        <Stack width="100%" justifyContent={'center'} direction={'row'}>
            <PageButton
                icon={<ChevronLeftIcon />}
                aria-label="Previous page"
                isDisabled={page === 1}
                opacity={page === 1 ? 0.5 : 1}
                cursor={page === 1 ? 'not-allowed' : 'pointer'}
                onClick={() => pageFunc(page - 1)}
            />
            <Stack direction="row" alignItems={'center'}>
                <PageButton
                    icon={<Box>1</Box>}
                    aria-label="1"
                    fontSize={page === 1 ? '30px' : '20px'}
                    onClick={() => pageFunc(1)}
                />
                {page > 3 && <Box>...</Box>}
                {getActualNumbers(page).map((num) => {
                    return (
                        <PageButton
                            key={'page' + num}
                            onClick={() => pageFunc(num)}
                            icon={<Box>{num}</Box>}
                            aria-label={num.toString()}
                            fontSize={page === num ? '30px' : '20px'}
                        >
                            {num}
                        </PageButton>
                    )
                })}
                {page < 23 && <Box>...</Box>}
                <PageButton
                    icon={<Box>25</Box>}
                    fontSize={page === 25 ? '30px' : '20px'}
                    aria-label="1"
                    onClick={() => pageFunc(25)}
                />
            </Stack>
            <PageButton
                icon={<ChevronRightIcon />}
                aria-label="Next page"
                isDisabled={page === 25}
                opacity={page === 25 ? 0.5 : 1}
                cursor={page === 25 ? 'not-allowed' : 'pointer'}
                onClick={() => pageFunc(page + 1)}
            />
        </Stack>
    )
}

export default Pagination
