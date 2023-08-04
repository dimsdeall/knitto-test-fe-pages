import Navbar from "@/components/Navbar";
import { wrapper } from "@/config/redux/store";
import "@/styles/globals.css";
import "@/styles/pagination.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({Component, ...rest}: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...props.pageProps} />
    </Provider>
  );
}
