from __future__ import print_function
import tensorflow as tf

# Defines the function that is referenced in the API call
def tensorCreate (size):
        # Creates a size x size tensor with random values between 0 and 1
        tensor = tf.random_uniform([size, size], minval=0, maxval=1, dtype=tf.float32, seed=None, name=None)
        # Creates a tensorflow session in order to get values
        with tf.Session() as sess:
                # Returns the value of the tensor in a string form so it can be passed to javascript
                return(str(sess.run(tensor)))
