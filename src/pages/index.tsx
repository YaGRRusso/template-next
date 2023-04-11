import { Input } from '@/components'
import { getUser } from '@/services/github'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CircleNotch, X } from 'phosphor-react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'

const createUserFormSchema = z.object({
  username: z.string().min(3, 'minLength'),
})

type UserFormProps = z.infer<typeof createUserFormSchema>

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('common')
  const { t: tForm } = useTranslation('form')
  const [search, setSearch] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormProps>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      username: 'YaGRRusso',
    },
  })

  const { data: githubUser, isLoading: isGithubUserLoading } = useQuery(
    ['user', search],
    () => {
      if (search) return getUser(search)
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  )

  const onSubmit: SubmitHandler<UserFormProps> = ({ username }) => {
    setSearch(username)
  }

  return (
    <div className="flex gap-2">
      <h1 className="text-3xl">{t('hello', { name: githubUser?.name })}</h1>
      {!githubUser?.name && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                placeholder="Username"
                type="text"
                error={tForm(errors.username?.message as string)}
                {...rest}
              />
            )}
          />
        </form>
      )}
      {isGithubUserLoading && <CircleNotch className="animate-spin" />}
      {githubUser?.name && githubUser?.html_url && (
        <X
          className="cursor-pointer text-gray-500 transition-colors hover:text-gray-400"
          onClick={() => setSearch('')}
        />
      )}
    </div>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'form'])),
    },
  }
}
