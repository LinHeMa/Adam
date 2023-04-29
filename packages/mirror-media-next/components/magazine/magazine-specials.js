import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { transformTimeDataIntoSlashFormat } from '../../utils/index'
// @ts-ignore
import DownloadSvg from '../../public/images/magazine-download-icon.svg'

const CardsList = styled.ul`
  margin: auto;
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  width: 280px;
  grid-gap: 48px 16px;
  gap: 48px 16px;

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(4, 1fr);
    width: 672px;
    grid-gap: 48px 32px;
    gap: 48px 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    grid-template-columns: repeat(6, 1fr);
    margin-top: 48px;
    width: 1104px;
    grid-gap: 60px 48px;
    gap: 60px 48px;
  }
`
const IssueCard = styled.li`
  position: relative;
  width: 132px;
  ${({ theme }) => theme.breakpoint.md} {
    width: 144px;
  }

  img {
    width: 100%;
    z-index: 0;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 132px;
  height: 178px;
  overflow: hidden;

  ${({ theme }) => theme.breakpoint.md} {
    width: 144px;
    height: 194px;
  }

  svg {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: white;
    z-index: 2;
    opacity: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(5, 79, 119, 0.87),
      rgba(5, 79, 119, 0.87)
    );
    opacity: 0;
    z-index: 1;
  }

  &::after {
    content: '立即下載';
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    z-index: 2;
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 0.8;
      transition: opacity 0.3s ease-in;
    }

    &::after {
      top: 60%;
      opacity: 0.9;
      transition: all 0.3s ease-in;
    }

    svg {
      top: 40%;
      opacity: 0.9;
      transition: all 0.3s ease-in;
    }
  }
`

const Date = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #1d9fb8;
  padding: 12px;
`
const IssueTitle = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #4a4a4a;
`

// If urlOriginal is a falsy value, redirect to /404 page.
const MagazineLink = ({ urlOriginal, children }) => {
  if (urlOriginal) {
    return (
      <Link href={urlOriginal} rel="noopener noreferrer" target="_blank">
        {children}
      </Link>
    )
  } else {
    return (
      <Link href="/404" rel="noopener noreferrer" target="_blank">
        {children}
      </Link>
    )
  }
}

export default function MagazineSpecials({ specials }) {
  const {
    data: { magazines },
  } = specials

  return (
    <CardsList>
      {magazines.map((magazine) => (
        <IssueCard key={magazine.id}>
          <MagazineLink urlOriginal={magazine.urlOriginal}>
            <ImageWrapper>
              <Image
                width={144}
                height={194}
                src={magazine.coverPhoto.resized.w480}
                alt={magazine.title}
              />
              <DownloadSvg />
            </ImageWrapper>
            <Date>
              {transformTimeDataIntoSlashFormat(magazine.publishedDate).slice(
                0,
                10
              )}
            </Date>
            <IssueTitle>{magazine.title}</IssueTitle>
          </MagazineLink>
        </IssueCard>
      ))}
    </CardsList>
  )
}
