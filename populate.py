import os

def create_entry(keyword, description, iframe_url):
    folder_name = keyword.replace(' ', '-')
    os.mkdir(folder_name)
    with open('placeholder/index.html') as template:
        content = template.read()
        content = content.replace("{{keyword}}", keyword)
        content = content.replace("{{description}}", description)
        content = content.replace("{{iframe_url}}", iframe_url)
        output = open(f'{folder_name}/index.html', 'w+')
        output.write(content)
        output.close()
        
        
with open('content-data.csv', 'r') as data:
    for record in data:
        splitted = record.split(',')
        
        splitted[0] = splitted[0].strip()
        splitted[1] = splitted[1].strip()
        splitted[2] = splitted[2].strip()
        
        create_entry(splitted[0], splitted[1], splitted[2])
        
