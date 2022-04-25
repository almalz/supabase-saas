import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { definitions } from '../types/supabase'
import { useAuth } from '../context/auth'

const Home = ({
  lessons,
}: { lessons: definitions['lessons'][] } & NextPage) => {
  const { user } = useAuth()
  console.log({ user })
  return (
    <div className="mx-auto my-16 w-full max-w-3xl px-2">
      {lessons?.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="mb-4 flex h-40 rounded p-8 text-xl shadow">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: lessons } = await supabase
    .from<definitions['lessons']>('lessons')
    .select('*')

  return {
    props: { lessons },
  }
}

export default Home
