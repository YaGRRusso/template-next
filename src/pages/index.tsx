import { getUser } from '@/services/github'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CircleNotch } from 'phosphor-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('yagrrusso')

  const { data: githubUser, isLoading: isGithubUserLoading } = useQuery(
    ['user', search],
    () => getUser(search),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  )

  return (
    <div className="text-3xl">
      {isGithubUserLoading ? (
        <CircleNotch className="animate-spin" />
      ) : (
        <h1>{t('hello', { name: githubUser?.name })}</h1>
      )}
    </div>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
