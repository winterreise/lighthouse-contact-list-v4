# Homepage (Root path)
get '/' do
  erb :index
end

# REST API for Contact

# get a single contact
get '/contact/:id' do
  contact = Contact.find(params[:id])
  # TODO return as JSON
end

# get all contacts (possibly with search)
get '/contact' do

end

# create a contact
post '/contact' do

end

# update a specific contact? maybe?
put '/contact/:id' do

end

# delete a contact
delete '/contact/:id' do
end
