import useSWR from 'swr';

function fetcher(url: string) {
  return fetch(url).then((res) => res.json())
}

function useUser() {
  const { data, error } = useSWR(`/api/auth/user`, fetcher)

  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  }
}


export default useUser;
