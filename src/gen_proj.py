import random

rx = random.randint(1, 10)
ry = random.randint(1, 10)

with open("data.js", "w") as f:
    f.write('data = \'{"resolution" : [' + str(rx) + ', ' + str(ry) + '],"layers" : [')
    f.write('[')
    for i in range(rx):
        f.write('[')
        for j in range(ry):
            f.write('[')
            f.write(str(i/rx))
            f.write(', ')
            f.write(str(j/ry))
            f.write(', ')
            f.write(str(0.5 * i/rx + 0.5 * j/ry))
            f.write(', ')
            f.write("1")
            f.write(']')
            if (j != ry - 1): f.write(',')
        f.write(']')
        if (i != rx - 1): f.write(',')
    f.write(']')
    f.write("]}\';")  