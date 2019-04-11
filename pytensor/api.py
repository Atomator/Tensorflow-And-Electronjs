from __future__ import print_function
from tensorfunction import tensorCreate
import sys
import zerorpc

# Creates a class that is used to pass data back and forth
class tensor(object):
    # The javascript calls this in order to check if the server is online, if it is it will return the text passed through
    def echo(self, text):
        return text
    
    # Calls the function in tensorfunction.py to create a random tensor that is size x size
    def createTensor(self, size):
        return tensorCreate(size)

# Sets and formats the port used for the server 
def parse_port():
    port = 4242
    try:
        port = int(sys.argv[1])
    except Exception as e:
        pass
    return '{}'.format(port)

# Creates a main function that creates and runs the server
def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    # Bind the object into javascript
    s = zerorpc.Server(tensor())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()
