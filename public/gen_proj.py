import random

rx = 40 #random.randint(1, 10)
ry = 40 #random.randint(1, 10)

with open("data.js", "w") as f:
    f.write('{resolution : [' + str(rx) + ', ' + str(ry) + '],layers : [')
    f.write('[')
    for i in range(rx):
        f.write('[')
        for j in range(ry):
            f.write('[')
            f.write(str(1))
            f.write(', ')
            f.write(str(1))
            f.write(', ')
            f.write(str(1))
            f.write(', ')
            f.write("1")
            f.write(']')
            if (j != ry - 1): f.write(',')
        f.write(']')
        if (i != rx - 1): f.write(',')
    f.write('],[')
    for i in range(rx):
        f.write('[')
        for j in range(ry):
            f.write('[1, 1, 1, ' + str(abs(i * i + j * j)/(rx * rx + ry * ry)) + ']')
            if (j != ry - 1): f.write(',')
        f.write(']')
        if (i != rx - 1): f.write(',')
    f.write("]]}")  