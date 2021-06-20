/**
 * Define Event name for socket io
 */
export const EventAction = {
  /**
   * Client connect to sever
   */
  connect: 'client-connect',
  /**
   * Client disconnect sever
   */
  disconnect: 'client-disconnect',

  client_join_conversation: 'client_join_conversation',

  server_send_message_to_conversation: 'server_send_message_to_conversation',
};
