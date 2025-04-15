# app/views/api/v1/example/index.json.jbuilder
json.array!(@items, :id, :name, :description)