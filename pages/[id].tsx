import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { supabase } from '../lib/supabase'
import { definitions } from '../types/supabase'

const LessonDetails = ({
  lesson,
}: {
  lesson: definitions['lessons']
} & NextPage) => {
  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      {lesson.description && <p>{lesson.description}</p>}
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
