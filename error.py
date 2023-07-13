try:
    do_something()
except:
    sys.stderr.write("something wrong\n")
    exit(1)