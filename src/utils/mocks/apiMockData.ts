import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";


export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance);

  mock.onPost("/api/payments").reply(200, {
    status: "api/payments OK! 😀",
  });

  mock.onAny().reply(200, {
    status: "Any other call will get this 😀",
    moreData: [1, 3, 4, 5],
  });
}
