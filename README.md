# react-on-rails

update your trees with (from root):

Client Command:
tree -I 'node_modules|dist|.git' client > client/client_tree.txt

Server Command:
tree -I 'node_modules|log|tmp|storage|.git|coverage|vendor|public|test|spec' server > server/server_tree.txt

Optional: Limit tree depth for both (e.g., max 3 levels):
Client:
tree -L 3 -I 'node_modules|dist|.git' client > client/client_tree.txt

Server:
tree -L 3 -I 'node_modules|log|tmp|storage|.git|coverage|vendor|public|test|spec' server > server/server_tree.txt
