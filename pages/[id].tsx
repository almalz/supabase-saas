import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { definitions } from '../types/supabase'
import Video from 'react-player'

const LessonDetails = ({
  lesson,
}: {
  lesson: definitions['lessons']
} & NextPage) => {

  const [videoUrl, setVideoUrl] = useState<string | undefined>()

  const getPremiumContent =  async () => {
    const {data} =  await supabase
    .from<definitions['premium_content']>('premium_content')
    .select('video_url')
    .eq('id',lesson.id)
    .single()

    setVideoUrl(data?.video_url)
  }

  useEffect(() => {
    getPremiumContent()
  }, [])

  console.log(!!videoUrl)

  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      {lesson.description && <p>{lesson.description}</p>}
      {videoUrl && <Video url={videoUrl} width={"100%"}/>}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: lessons } = await supabase
    .from<definitions['lessons']>('lessons')
    .select('id')

  const paths = lessons!.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id)
    return {
      props: {},
    }
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', params.id)
    .single()

  return {
    props: {
      lesson,
    },
  }
}

export default LessonDetails
