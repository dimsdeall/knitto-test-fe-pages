import Paginate from "@/components/Paginate";
import {
  getRunningQueriesThunk,
  todoApi,
  useGetTodosPaginationQuery,
} from "@/config/redux/api/todoApi";
import { useAppDispatch, useAppSelector } from "@/config/redux/hooks";
import { updatePage } from "@/config/redux/reducer/pageReducer";
import { wrapper } from "@/config/redux/store";
import AddTodo from "./AddTodo";


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const state = store.getState();
    await store.dispatch(
      todoApi.endpoints.getTodosPagination.initiate(state.page)
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default function Home() {
  const pagination = useAppSelector((state) => state.page);
  const { data, isLoading, refetch, isFetching } =
    useGetTodosPaginationQuery(pagination);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="py-5 px-3 sm:px-5 md:px-7 lg:px-10">
        <AddTodo onRefresh={refetch} />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  user
                </th>
                <th scope="col" className="px-6 py-3">
                  title
                </th>
                <th scope="col" className="px-6 py-3">
                  complete
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr className="bg-white border-b">
                  <td colSpan={5} align="center" className="h-[530px]">
                    Loading ....
                  </td>
                </tr>
              ) : (
                data?.map((val, key) => {
                  return (
                    <tr key={key} className="bg-white border-b">
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {val.id}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {val.userId}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {val.title}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {val.completed ? "Complete" : "Not Complete"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center">
        <Paginate
          currentPage={pagination.page}
          onPageChange={(res) => {
            dispatch(updatePage(res));
          }}
          pageSize={10}
          totalCount={200}
        />
      </div>
    </div>
  );
}
