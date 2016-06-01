# Homepage (Root path)
get '/' do
  erb :index
end

# REST API for Contact

# get a single contact
get '/contacts/:id' do
  Contact.find(params[:id]).as_json
end

# get all contacts (possibly with search)
get '/contacts' do

end

# create a contact
post '/contacts' do

end

# update a specific contact? maybe?
put '/contacts/:id' do

end

# delete a contact
delete '/contacts/:id' do
end
