function mapRange(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

const H = window.innerHeight;

function map(start, end, defaultValue) {
  if (window.scrollY > H) {
    // return default on overflow
    return defaultValue;
  }
  return mapRange(window.scrollY, 0, H, start, end);
}

function mappedWidth() {
  return map(50, 0, 0);
}

const container = document.getElementById("mycontainer");
const items = document.getElementById("otherpart");

document.addEventListener("scroll", function (e) {
  if (!e.isTrusted) {
    return;
  }
  const w = mappedWidth();
  console.log(w);
  container.style.width = `${w}vw`;
  container.style.transform = `scale(${w > 0 ? 1 : 0})`;
  items.style.transform = applyTransform();
});

document.onload = () => {
  items.style.transform = applyTransform();
};

function applyTransform() {
  const rotate = map(30, 0, 0);
  const skew = map(20, 0, 0);
  const scale = map(1.6, 1, 1);
  const translateY = map(-400, H, H);
  const translateX = map(400, 0, 0);

  let transform = "";
  transform += `rotate(${rotate}deg) skewY(-${skew}deg) scale(${scale})`;
  transform =
    `translateX(${translateX}px) translateY(${translateY}px) ` + transform;
  return transform;
}
