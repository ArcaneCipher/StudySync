# Renders selected user attributes in JSON format

json.extract! @user, :id, :email, :username, :avatar_url, :timezone, :created_at
