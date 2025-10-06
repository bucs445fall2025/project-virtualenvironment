import random

rx = random.randint(1, 10)
ry = random.randint(1, 10)
layers = random.randint(1, 1)

with open("data.js", "w") as f:
    f.write('data = \'{"resolution" : [' + str(rx) + ', ' + str(ry) + '],"layers" : [')
    for l in range(layers):
        f.write('[')
        for i in range(rx):
            f.write('[')
            for j in range(ry):
                f.write('[')
                for k in range(3):
                    f.write(str(random.random()))
                    f.write(', ')
                f.write("1")
                f.write(']')
                if (j != ry - 1): f.write(',')
            f.write(']')
            if (i != rx - 1): f.write(',')
        f.write(']')
        if (l != layers - 1): f.write(',')
    f.write("]}\';")  