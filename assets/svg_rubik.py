xs = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800]
ys = [24.72, 53.59, 82.46, 111.32, 140.19, 169.06, 197.93, 226.79, 255.66, 284.53, 313.4, 342.26, 371.13, 400.0, 428.87, 457.74, 486.6, 515.47, 544.34, 573.21, 602.07, 630.94, 659.81, 688.68, 717.54, 746.41, 775.28]

dy = -4
xm = xs.index(400)
ym = ys.index(400)
coords_list = []

x, y = xm, ym - 6
for j in range(3):
    for i in range(3):
        coords_list.append(
            [[xs[x + i - j], ys[y + i + j + dy]],
             [xs[x + i - j + 1], ys[y + i + j + 1 + dy]],
             [xs[x + i - j], ys[y + i + j + 2 + dy]],
             [xs[x + i - j - 1], ys[y + i + j + 1 + dy]]])
x, y = xm - 3, ym - 3
for j in range(3):
    for i in range(3):
        coords_list.append(
            [[xs[x + i], ys[y + i + j * 2 + dy]],
             [xs[x + i + 1], ys[y + i + j * 2 + 1 + dy]],
             [xs[x + i + 1], ys[y + i + j * 2 + 3 + dy]],
             [xs[x + i], ys[y + i + j * 2 + 2 + dy]]])
x, y = xm, ym
for j in range(3):
    for i in range(3):
        coords_list.append(
            [[xs[x + i], ys[y - i + j * 2 + dy]],
             [xs[x + i + 1], ys[y - i + j * 2 - 1 + dy]],
             [xs[x + i + 1], ys[y - i + j * 2 + 1 + dy]],
             [xs[x + i], ys[y - i + j * 2 + 2 + dy]]])

x, y = xm, ym + 7
for j in range(3):
    for i in range(3):
        coords_list.append(
            [[xs[x + i - j], ys[y + i + j + dy]],
             [xs[x + i - j + 1], ys[y + i + j + 1 + dy]],
             [xs[x + i - j], ys[y + i + j + 2 + dy]],
             [xs[x + i - j - 1], ys[y + i + j + 1 + dy]]])
x, y = xm + 4, ym - 7
for j in range(3):
    for i in range(3):
        coords_list.append(
            [[xs[x + i], ys[y + i + j * 2 + dy]],
             [xs[x + i + 1], ys[y + i + j * 2 + 1 + dy]],
             [xs[x + i + 1], ys[y + i + j * 2 + 3 + dy]],
             [xs[x + i], ys[y + i + j * 2 + 2 + dy]]])
x, y = xm - 7, ym - 4
for j in range(3):
    for i in range(3):
        coords_list.append(
            [[xs[x + i], ys[y - i + j * 2 + dy]],
             [xs[x + i + 1], ys[y - i + j * 2 - 1 + dy]],
             [xs[x + i + 1], ys[y - i + j * 2 + 1 + dy]],
             [xs[x + i], ys[y - i + j * 2 + 2 + dy]]])

sides = ['up', 'front', 'right', 'down', 'back', 'left']
colors = ['white', 'green', 'red', 'yellow', 'blue', 'orange']

with open('cube.svg', 'w') as svg:
    print('''<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
''', file=svg)
    for i, coords in enumerate(coords_list):
        x = i % 3
        y = i % 9 // 3
        ix = i // 9
        side = sides[ix]
        if i % 9 == 0:
            print(f'  <!-- {side} -->', file=svg)
        print(f'  <path d="M ' +
              ' L '.join(' '.join(map(str, coord)) for coord in coords) +
              f' Z" fill="{colors[ix]}" stroke="black" stroke-width="4" ' +
              f'class="tile" side="{ix}" x="{x}" y="{y}"/>',
              file=svg)
        if i % 9 == 8:
            print(file=svg)
    print('</svg>', file=svg)
