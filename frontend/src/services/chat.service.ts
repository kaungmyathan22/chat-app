import { api } from "../lib/api";

export class ChatService {
  static async getConversation() {
    return api.get("/v1/conversation").then((res) => res.data);
  }
  static async fetchMessages(conversationId: string) {
    return api
      .get(`/v1/conversation/${conversationId}/message`)
      .then((res) => res.data);
  }
  static async sendMessage(conversationId: string, content: string) {
    return api
      .post(`/v1/conversation/${conversationId}/message`, { content })
      .then((res) => res.data);
  }
}
