import styled from 'styled-components'
import { setPageCache } from '../../utils/cache-setting'
import { ACCESS_SUBSCRIBE_FEATURE_TOGGLE } from '../../config/index.mjs'
import { getLogTraceObject } from '../../utils'

const Page = styled.main`
  min-height: 70vh;
  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: -32px;
  }
`

/**

 * @return {JSX.Element}
 */
function SubscribeInfo() {
  return <Page>subscribe info page</Page>
}

export default SubscribeInfo

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ req, res }) {
  setPageCache(res, { cachePolicy: 'no-store' }, req.url)

  /* eslint-disable-next-line no-unused-vars */
  const globalLogFields = getLogTraceObject(req)

  if (ACCESS_SUBSCRIBE_FEATURE_TOGGLE !== 'on') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}
