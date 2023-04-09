import React, { useState, useCallback } from 'react'
import {
  Card, CardActions, CardContent, CardHeader, CardMedia, Button, Typography, Modal, IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import styled from '@emotion/styled'
import type { Article } from '../../types'

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = styled.div`
  width: 100%;  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingIcon = styled(RotateRightIcon)`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
`

const FlexButtons = styled(CardActions)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 0;
  [data-btn] {
    width: 100%;
  }
  @media only screen and (min-width: 480px) {
    flex-direction: row;
    [data-btn] {
      width: initial;
    }
  }
`

export default function ArticleCard ({ article }: { article: Article }): JSX.Element {
  const [summary, setSummary] = useState()
  const [showSummary, setShowSummary] = useState(false)
  const [error, setError] = useState<boolean>(false)

  const getSummary = useCallback(async () => {
    setShowSummary(true)
    try {
      const existingSumReq = await fetch(`/isSummary?url=${article.url}`)
      const existingSum = await existingSumReq.json()
      if (existingSum.summary != null) setSummary(existingSum.summary)
      else {
        const req = await fetch(`api/getSummary?url=${article.url}`)
        const res = await req.json()
        if (res.error != null || res.summary === 'undefined') {
          setError(true)
          return
        }
        setSummary(res?.summary)
        await fetch(`/isSummary?url=${article.url}&fn=create&summary=${res?.summary as string}`)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setError(true)
    }
  }, [article.url])

  return (
    <Wrapper>
      <CardMedia sx={{ height: '150px', width: '100%' }} image={article.urlToImage} />
      <CardHeader title={article.title} />
      <CardContent>
        <Typography variant="body1" component="p">
          {`Source: ${article.source.name}`}
        </Typography>
        {article.author != null && <Typography variant="body1" component="p">{`Author: ${article.author}`}</Typography>}
        {article.description != null && <Typography variant="body1" component="p">{article.description}</Typography>}
      </CardContent>
      <div>
        <FlexButtons>
          <Button data-btn variant="outlined" color="secondary" href={article.url} target="_blank" sx={{ marginTop: '8px' }}>View Full Article</Button>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button data-btn variant="outlined" color="secondary" onClick={getSummary} sx={{ marginTop: '8px' }}>Summarize This for Me</Button>
        </FlexButtons>
      </div>
      <Modal
        open={showSummary}
        onClose={() => { setShowSummary(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <Card sx={{ width: '100%', maxWidth: '500px', margin: 4 }}>
            <HeaderWrapper>
              <CardHeader title="Summary" />
              <IconButton onClick={() => { setShowSummary(false) }}><CloseIcon /></IconButton>
            </HeaderWrapper>

            <CardContent>
              {error
                ? <Typography variant="body1" component="p" sx={{ color: 'red' }}>We were unable to get the article summary. The publisher may restrict access to this article.</Typography>
                : (
                <>
                  {summary != null && <Typography variant="body1" component="p">{summary}</Typography>}
                  {summary == null && <Loader><LoadingIcon sx={{ fontSize: 58 }} /></Loader>}
                </>
                  )}
            </CardContent>
          </Card>
        </ModalContent>
      </Modal>
    </Wrapper>
  )
}
