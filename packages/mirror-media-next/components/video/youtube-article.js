import styled from 'styled-components'
import { transformTimeDataIntoSlashFormat } from '../../utils'
import { useShareFbUrl } from '../../hooks/useShareFbUrl'
import { useShareLineUrl } from '../../hooks/useShareLineUrl'
import ButtonCopyLink from '../story/shared/button-copy-link'

const Wrapper = styled.div`
  padding: 0 16px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: unset;
  }
`

const Title = styled.h2`
  font-size: 20px;
  line-height: 1.4;
  color: #4a4a4a;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 24px;
    line-height: 1.5;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 32px;
  }
`
const Date = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #9b9b9b;
  margin-top: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 16px;
    line-height: 1.5;
    margin-top: 40px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 20px;
    margin-top: 42px;
  }
`

const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #9b9b9b;
  margin-top: 12px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }

  > a {
    text-decoration: underline;
  }
`

const ShareIcons = styled.div`
  display: flex;
  column-gap: 16px;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoint.xl} {
    margin-top: 28px;
  }
`
const Icon = styled.img`
  cursor: pointer;
`

/**
 * @param {Object} props
 * @param {import('../../type/youtube').YoutubeVideo} props.video
 * @returns
 */
export default function YoutubeArticle({ video }) {
  const shareFbUrl = useShareFbUrl()
  const shareLineUrl = useShareLineUrl()
  const description = video.description
    ?.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>')
    .replace(/↵|\n/g, '<br>')
    .split('-----')[0]

  return (
    <Wrapper>
      {video.title && <Title>{video.title}</Title>}
      {video.publishedAt && (
        <Date>{transformTimeDataIntoSlashFormat(video.publishedAt)}</Date>
      )}
      {video.description && (
        <Description dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <ShareIcons>
        <a href={shareFbUrl} target="_blank" rel="noreferrer">
          <Icon src="/images/video-share-fb.svg" alt="share to facebook" />
        </a>
        <a href={shareLineUrl} target="_blank" rel="noreferrer">
          <Icon src="/images/video-share-line.svg" alt="share to facebook" />
        </a>
        <ButtonCopyLink width={40} height={40} />
      </ShareIcons>
    </Wrapper>
  )
}
