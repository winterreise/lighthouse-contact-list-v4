# Homepage (Root path)
get '/' do
  erb :index
end

# REST API for Contact

# get a single contact
get '/contacts/:id' do
  begin
    content_type :json
    Contact.find(params[:id]).to_json
  rescue ActiveRecord::RecordNotFound => error
    STDERR.puts error
    status 404
  end
end

# get all contacts (possibly with search)
get '/contacts' do
  begin
    content_type :json
    Contact.all.to_json
  rescue
    status 500
  end
end

# create a contact
post '/contacts' do
  begin
    content_type :json
    status 201
    request.body.rewind  # in case someone already read it
    body = JSON.parse(request.body.read) # body is now a hash representing the JSON that was sent to us from jQuery
    Contact.create!(name: body['name'], email: body['email']).to_json
  rescue ActiveRecord::RecordInvalid => error
    STDERR.puts error
    status 400
  rescue => error
    STDERR.puts error
    status 500
  end
end

# update a specific contact? maybe?
# put '/contacts/:id' do
#
# end

# delete a contact
delete '/contacts/:id' do
  begin
    content_type :json
    status 200
    Contact.destroy(params[:id]).to_json
  rescue
    status 500
  end
end
