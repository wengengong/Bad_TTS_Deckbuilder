import requests
from bs4 import BeautifulSoup

# get search name
name = input().strip()

# search for that name and get the page
page = requests.get('https://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&name=+['+ name +']')
soup = BeautifulSoup(page.content, 'html.parser')

# find images (probably a better way than nested ifs but im lazy)
if "Card Search" in soup.title.string :
    # if there are multiple results 
    # get the first page,
    # if the are multiple pages of results i could get all of them by searching for the class
    # but that could lead to downloading every card if nothing is put as a input
    # so ill need to validate it, and also im lazy

    images = soup.findAll('img', width='95')
    # print image URL and name (used as return value for py-shell)
    # separated by a NULL character
    # image URL's go up 2 directories to get images i so have to manually replace them
    for image in images:
        print('https://gatherer.wizards.com/' + image['src'].lstrip('../../') + chr(0) + image['alt'])
else:
    # if the result is a card page

    # i don't need a 'foreach' loop
    image = soup.find('img', alt = name)
    print('https://gatherer.wizards.com/' + image['src'].lstrip('../../') + chr(0) + image['alt'])


