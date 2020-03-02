const ancientOctus = extendContent(UnitType, 'ancient-octus', {});

const offsetY = -10;

ancientOctus.constructor = prov(() => {
	var age = Math.random() * 40;

	return new JavaAdapter(HoverUnit, {
		update() {
			this.super$update();
			++age;
		},
		draw() {
			const originalColor = Draw.getColor();

			// 0 = right, 90 = up, etc.
			const rads = (Math.PI / -180) * (this.rotation - 180);
			const cos = Math.cos(rads);
			const sin = Math.sin(rads);
			const cx = this.x;
			const cy = this.y;

			const rot = (y, x) => ([
				(cos * -x) + (sin * y) + cx,
				(cos * y) - (sin * -x) + cy
			]);

			Draw.color(originalColor, 0.2);

			for (var t = 0; t < 5; t++) {
				var last = rot(0, offsetY);

				var ageFactor = 0.13 / ((t / 2) + 1);
				var scaleFactor = 1.3 + (Math.pow(t, 2) / 4);
				var densityFactor = -4 - (t * 0.5);

				for (var i = 1; i < 10; i++) {
					var p = rot(
						(
							Math.sin(
								-i
								+ (age * ageFactor)
								+ t
							)
							* (i * scaleFactor)
						),
						(
							i * densityFactor
						) + offsetY
					);

					Lines.stroke((1-(i/10)) * 7 + 1);
					Lines.line(
						last[0],
						last[1],
						p[0],
						p[1]
					);

					last = p;
				}
			}

			Draw.color(originalColor, 1.0);
			this.super$draw();
		}
	});
});
